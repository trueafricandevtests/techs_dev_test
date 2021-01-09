from app.utils import expose, url_for, application, render_response

@expose('/')
@expose('/home')
def homepage(request):
    return render_response([{"Message":"New application"}])