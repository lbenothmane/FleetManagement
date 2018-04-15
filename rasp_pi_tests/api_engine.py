import requests
import json
import time
from config import ConfigStore
from threading import Thread

class API_Engine(Thread):
    class __Singleton:
        def __init__():
            pass
            
    instance = None
    
    def __init__(self):
        if not API_Engine.instance:
            API_Engine.instance = API_Engine.__Singleton()
            self.instance.log = False
            self.instance.send = False
            self.instance.pid_data = {}
            self.instance.pos_data = {}
            
    def run(self):
        while True:
            time.sleep(5)
            if self.instance.pid_data:
                pids = []
                for pid in self.instance.pid_data.items():
                    pids.append({"pid":pid[0], "data":pid[1]})
                pid_body = {'vid': ConfigStore().get_vid(), 'did': ConfigStore().get_did(), 'pids': pids}
                do_request("put", url=ConfigStore().get_server_uri() + '/vehicle/pid/' + ConfigStore().get_vid(), pid_body)
                self.instance.pid_data = {}
            if self.instance.pos_data:
                do_request("put", url=ConfigStore().get_server_uri() + '/vehicle/' + ConfigStore().get_vid(), pid_body)
                self.instance.pos_data = {}
        
    def set_logging(self, log):
        self.instance.log = log
    
    def set_send(self, send):
        self.instance.send = send
        
    def pid_send(self, pid, data):
        self.instance.pid_data[pid] = data

    def pos_send(self, lat, lon):
        self.instance.pos_data = {"latitude": lat, "longitude": lon}

    def get_vehicle(self)
        result = do_request("get", url=ConfigStore().get_server_uri() + '/vehicle/init/' + ConfigStore().get_vid())
        return result.json()
        
    def do_request(self, type, url, body = {}):
        response = ""
        if self.instance.log:
            print(type + " " + url + " " + body)
        if self.instance.send:
            if type == "put":
                response = requests.put(url=url, data=body)
            elif type == "post":
                response = requests.post(url=url, data=body)
            elif type == "delete":
                if body:
                    response = requests.delete(url=url, body=body)
                else:
                    response = requests.delete(url=url)
            elif type == "get":
                if body:
                    response = requests.get(url=url, params=body)
                else:
                    response = requests.get(url=url)
        return response