import requests
import json
import time
from config import ConfigStore
from threading import Thread

class API_Engine(Thread):
    class __Singleton:
        def __init__(self):
            pass
            
    instance = None
    
    def __init__(self):
        super(API_Engine, self).__init__()
        if not API_Engine.instance:
            API_Engine.instance = API_Engine.__Singleton()
            self.instance.log = False
            self.instance.send = False
            self.instance.pid_data = {}
            self.instance.pos_data = {}
            
    def run(self):
        while True:
            time.sleep(5)
            if self.instance.pid_data or self.instance.pos_data:
                pids = []
                for pid in self.instance.pid_data.items():
                    pids.append({"pid":pid[0], "data":pid[1]})
                pid_body = {'did': ConfigStore().get_did(), 'pids': pids}
                if self.instance.pos_data:
                    pid_body['latititude']  = self.instance.pos_data['latitude']
                    pid_body['longitude'] = self.instance.pos_data['longitude']
                self.do_request("put", url=ConfigStore().get_server_uri() + '/vehicle/pid/' + ConfigStore().get_vid(), body=pid_body)
                self.instance.pid_data = {}
                self.instance.pos_data = {}
        
    def set_logging(self, log):
        self.instance.log = log
    
    def set_send(self, send):
        self.instance.send = send
        
    def pid_send(self, pid, data):
        self.instance.pid_data[pid] = data

    def pos_send(self, lat, lon):
        self.instance.pos_data = {"latitude": lat, "longitude": lon}

    def get_vehicle(self):
        result = self.do_request("get", url=ConfigStore().get_server_uri() + '/vehicle/init/' + ConfigStore().get_vid())
        return result.json()
        
    def do_request(self, type, url, body = {}):
        response = ""
        if self.instance.log:
            print(type + " " + url + " " + str(body))
            time.sleep(.5)
        if self.instance.send:
            if type == "put":
                response = requests.put(url=url, json=body)
            elif type == "post":
                response = requests.post(url=url, json=body)
            elif type == "delete":
                if body:
                    response = requests.delete(url=url, json=body)
                else:
                    response = requests.delete(url=url)
            elif type == "get":
                response = requests.get(url=url)
        return response
