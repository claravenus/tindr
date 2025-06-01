from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Mot de passe en dur
PASSWORD = "JaiCompris"

# déclaration des variables

liste_match = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/check-password", methods=["POST"])
def check_password():
    data = request.get_json()
    user_input = data.get("password", "")
    if user_input == PASSWORD:
        return jsonify({"result": "Bravo ! Mot de passe correct."})
    else:
        return jsonify({"result": "Mot de passe incorrect."})

@app.route("/check-match", methods=["POST"])
def check_match():
    


if __name__ == "__main__":
    app.run(debug=True)


