import socket
import sys
import subprocess
from loguru import logger as logging
import json
import threading
import time


HOST, PORT = "172.16.3.206", 1337
logging.add("log/output.log", backtrace=True, diagnose=True)

class DataFormat:
    def add_new_agent(self, name, address, description):
        return json.dumps({"type":"new_agent", "name":name, "address":address, "description":""}).encode('utf-8')
        
    def add_new_vagrant(self, id, provider, state, directory):
        return {"id":id, "provider":provider, "state":state, "directory":directory}

def execute_command(command, exit):
    package_subprocess = subprocess.Popen(command, shell=True, close_fds=True, stderr=subprocess.STDOUT, stdout=subprocess.PIPE)
    package_subprocess.wait()
    out, err = package_subprocess.communicate()

    if exit == True:
        if package_subprocess.returncode == 0:
            logging.info("Command [{}] Success".format(command))
        else:
            logging.error("Command [{}] Failed (message : {})".format(command, err))
            sys.exit(1)

    return {"return_code":package_subprocess.returncode, "out":out, "err":err}
    
class DoSomething:
    def __init__(self):
        logging.info("DoSomething Start")

    def vagrant_ip(self, id):
        result = execute_command("vagrant up {}".format(id), True)
    
    def get_latest_vagrant(self):
        result = execute_command("vagrant global-status | grep 'running\|poweroff' | awk {'print $1,$3,$4,$5'}", True)
        result = result["out"].decode("utf-8").split("\n")
        vagrant_list = []
        
        for list in result:
            agent = list.split(" ")
            logging.info(agent)
            if len(agent) == 1:
                continue
            vagrant_list.append(DataFormat().add_new_vagrant(agent[0], agent[1], agent[2], agent[3]))
        logging.info(vagrant_list)

        return vagrant_list

def ConnectDomainSocket(socket):
    while True:
        logging.info("AAA")
        socket.send(json.dumps(DoSomething().get_latest_vagrant()).encode('utf-8'))
        time.sleep(60)

class TCPClient:
    def __init__(self):
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            self.sock.connect((HOST, PORT))
            t = threading.Thread(target=ConnectDomainSocket, args=(self.sock,))
            t.start()
            self.sock.send(DataFormat().add_new_agent(socket.gethostname(), self.sock.getsockname(), ""))

        except Exception as e:
            logging.error(e)

    def receive_wait_data(self):
        while True:
            # Receive data from the server and shut down
            try:
                received = str(self.sock.recv(1024), "utf-8")
                logging.info("Received Data {}".format(received))
            except Exception as error:
                logging.error("Exception Error {}".format(error))
                sys.exit(1)

            if received == "":
                sys.exit(1)

def main():
    print(socket.gethostname())
    tcp_client = TCPClient()
    tcp_client.receive_wait_data()


if __name__ == "__main__":
    main()