default_vehicle = {'vid': 10, 'did': 10, 'pids': [0x0D, 0x2F], 'bitrate': 500000}

default_server = {'uri':  'http://35.193.87.37:8080'}

default_mode = "test"

class ConfigStore:
    class __Singleton:
        def __init__(self):
            pass
    instance = None

    def __init__(self):
        if not ConfigStore.instance:
            ConfigStore.instance = ConfigStore.__Singleton()
            self.instance.vehicle = default_vehicle
            self.instance.server = default_server
            self.instance.mode = default_mode

    def get_pids(self):
        if hasattr(self.instance.vehicle, 'pids'):
            return self.instance.vehicle['pids']
        else:
            return default_vehicle['pids']

    def get_vid(self):
        if hasattr(self.instance.vehicle, 'vid'):
            return self.instance.vehicle['vid']
        else:
            return default_vehicle['vid']

    def get_did(self):
        if hasattr(self.instance.vehicle, 'did'):
            return self.instance.vehicle['did']
        else:
            return default_vehicle['did']

    def get_bitrate(self):
        if hasattr(self.instance.vehicle, 'bitrate'):
            return self.instance.vehicle['bitrate']
        else:
            return default_vehicle['bitrate']

    def get_server_uri(self):
        if hasattr(self.instance.server, 'uri'):
            return self.instance.server['uri']
        else:
            return default_server['uri']

    def set_vehicle(self, vehicle):
        self.instance.vehicle = vehicle

    def set_server(self, server):
        self.instance.server = server

    def set_mode(self, mode):
        self.instance.mode = mode

    def log_all(self):
        if self.instance.mode = "test"
            return True
        else:
            return False
