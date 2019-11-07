from loguru import logger as logging
import socketserver
import socket
import asyncio
import sys
import os
import threading

SERVER_PORT=8005
SERVER_ADDRESS="/tmp/vm_remote.sock"
logging.add("log/output.log", backtrace=True, diagnose=True)

class ConnectWebServer:
    def __init__(self):
        # Create a UDS socket
        self.sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        
        try:
            self.sock.connect(SERVER_ADDRESS)
            logging.info("success connect server {}".format(SERVER_ADDRESS))
        except Exception as e:
            logging.info("failed connect server {}".format(SERVER_ADDRESS))
            sys.exit(1)

    def get_command(self):
        while True:
            data = self.sock.recv(512)


class MyTCPHandler(socketserver.BaseRequestHandler):
    """
    The request handler class for our server.

    It is instantiated once per connection to the server, and must
    override the handle() method to implement communication to the
    client.
    """

    def handle(self):
        # self.request is the TCP socket connected to the client
        self.data = self.request.recv(1024).strip()
        print("{} wrote:".format(self.client_address[0]))
        print(self.data)
        # just send back the same data, but upper-cased
        self.request.sendall(self.data.upper())

def ConnectDomainSocket():
    connect_web_server = ConnectWebServer()
    connect_web_server.get_command()
    
def main():
    t = threading.Thread(target=ConnectDomainSocket)
    t.start()

    HOST, PORT = "0.0.0.0", SERVER_PORT
   
    # Create the server, binding to localhost on port 9999
    with socketserver.TCPServer((HOST, PORT), MyTCPHandler) as server:
        # Activate the server; this will keep running until you
        # interrupt the program with Ctrl-C
        logging.info("success create tcp server")
        server.serve_forever()
        server.server_close()

if __name__ == "__main__":
    main()
    