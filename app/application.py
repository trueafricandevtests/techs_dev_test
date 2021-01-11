from werkzeug import Request
from werkzeug.exceptions import HTTPException, NotFound
from app.utils import local, local_manager, url_map, render_response
from app import views

class APP():

    def __init__(self):
        local.application = self
    
    def wsgi_app(self, environ, start_response):
        local.application = self
        request = Request(environ)
        response = self.dispatch_request(environ, request)
        return response(environ, start_response)
    
    def error_404(self):
        response = render_response([{"Message":"Error 404, Page not found try checking the url"}])
        response.status_code = 404
        return response

    def dispatch_request(self, environ, request):
        
        local.url_adapter = adapter = url_map.bind_to_environ(environ)
        try:
            endpoint, values = adapter.match()
            handler = getattr(views, endpoint)
            return handler(request, **values)
        except NotFound:
            return self.error_404()
        except HTTPException as e:
            return e

    def __call__(self, environ, start_response):
        return self.wsgi_app(environ, start_response)