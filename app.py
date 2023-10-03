from db.db import app
from Routes.users_routes import users_routes
from Routes.routes_routes import rutas_routes
from Routes.precaution_tips_routes import precautionTips_routes
from Routes.comments_routes import comments_routes

app.register_blueprint(users_routes, url_prefix="/users")
app.register_blueprint(rutas_routes, url_prefix="/routes")
app.register_blueprint(precautionTips_routes, url_prefix="/precaution_tips")
app.register_blueprint(comments_routes, url_prefix="/comments")

@app.route("/")
def index():
    return "Hello World"

if __name__ == "__main__":
    app.run(debug=True)