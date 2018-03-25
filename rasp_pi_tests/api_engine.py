import requests
import json
from config import ConfigStore

def pid_send(pid_data):
    body = {'vid': ConfigStore().get_vid(), 'did': ConfigStore().get_did(), 'pids': [pid_data]}
    requests.put(url=ConfigStore().get_server_uri() + '/vehicle/pid/' + ConfigStore().get_vid(), body)

def send_pos(lat, lon):
    body = {'latitude': lat, 'longitude': lon}
    requests.put(url=ConfigStore().get_server_uri() + '/vehicle/' + ConfigStore().get_vid(), body)

def get_vehicle()
    result = requests.get(url=ConfigStore().get_server_uri() + '/vehicle/' + ConfigStore().get_vid())
    return json.loads(result.json())
