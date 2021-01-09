import json
from werkzeug.local import Local, LocalManager
from werkzeug.routing import Map, Rule
from werkzeug.wrappers import BaseResponse
from werkzeug.wrappers.json import JSONMixin

local = Local()
local_manager = LocalManager([local])
application = local('application')

class Response(JSONMixin, BaseResponse):
    pass

def render_response(response_data):
    response_data = json.dumps(response_data)    
    response_data = bytes(response_data, 'utf-8') 
    return Response(response_data, mimetype='application/json')

url_map = Map()
def expose(rule, **kw):
    def decorate(f):
        kw['endpoint'] = f.__name__
        url_map.add(Rule(rule, **kw))
        return f
    return decorate

def url_for(endpoint, _external=False, **values):
    return local.url_adapter.build(endpoint, values, force_external=_external)
