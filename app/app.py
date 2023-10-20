from flask import render_template, request, session, jsonify

# Importar la configuracion de la base de datos y la app de Flask
from db.db import app, db
# Importar el modelo de User necesario para consultas
from Models.users_models import Users

# Imortar todas las rutas de las APIs
from Routes.users_routes import users_routes
from Routes.routes_routes import routes_routes
from Routes.alarms_routes import alarms_routes
from Routes.comments_routes import comments_routes
# Asignando prefijos para llamado de las APIs
app.register_blueprint(users_routes, url_prefix="/users")
app.register_blueprint(routes_routes, url_prefix="/routes")
app.register_blueprint(alarms_routes, url_prefix="/alarms")
app.register_blueprint(comments_routes, url_prefix="/comments")

# Rutas de la pagina
@app.route("/")
def home():
    return render_template('home.html')
    
@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        return render_template('community.html')
    else: 
        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']

            user = Users.query.filter_by(username=username, password=password).first()

            if user:
                session['user_id'] = user.id
                print('Inicio de sesión exitoso')
                return render_template('community.html')
            else:
                print('Credenciales incorrectas')
                return render_template('login.html')

    return render_template('login.html')

@app.route("/register", methods=['GET', 'POST'])
def register():
    if 'user_id' in session:
        return render_template('community.html')
    else: 
        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']
            passwordVerification = request.form['passwordVerification']

            user = Users.query.filter_by(username=username).first()

            if user:
                print('Usuario existente, no se puede crear el usuario')
            else: 
                if password == passwordVerification :
                    print("Las contraseñas son iguales, se puede crear el usuario")
                    db.session.add(Users(username= username,password=password))
                    db.session.commit()
                    print("Usuario creado con exito")
                    return render_template('login.html')
                else:
                    print("Las contraseñas son diferentes, no se puede crear el usuario")


    return render_template('register.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    print('Cierre de sesión exitoso')
    return render_template('home.html')

@app.route("/community")
def community():
    if 'user_id' in session:
        user_id = session['user_id']
        user = Users.query.get(user_id)
        return render_template('community.html', userImg=user.image)
    else: 
        print("No hay usuario Ingresado")
        return render_template('login.html')

@app.route("/community/profile")
def profile():
    if 'user_id' in session:
        user_id = session['user_id']
        user = Users.query.get(user_id)
        return render_template('profile.html',userName=user.username,userImg=user.image)
    else: 
        return render_template('login.html')

@app.route("/community/routes")
def routes():
    if 'user_id' in session:
        user_id = session['user_id']
        user = Users.query.get(user_id)
        return render_template('routes.html', userImg=user.image)
    else: 
        return render_template('login.html')

@app.route("/community/routes/add")
def add_routes():
    if 'user_id' in session:
        user_id = session['user_id']
        user = Users.query.get(user_id)
        return render_template('add_route.html', userImg=user.image)
    else: 
        return render_template('login.html')

@app.route('/getUserIDSession', methods=['GET'])
def get_user_id():
    user_id = session.get('user_id', None)
    return jsonify({'user_id': user_id})
    
if __name__ == "__main__":
    app.run(debug=True, port=5000)
