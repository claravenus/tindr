from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Simuler des profils "matchables"
profils = [
    "Alice", "Léo", "Emma", "Lucas", "Clara",
    "Nina", "Hugo", "Jade", "Tom", "Sofia",
    "Axel", "Lina", "Noah", "Eva", "Max"
]

@app.route("/")
def index():
    return render_template("index.html")
    
@app.route('/match', methods=['POST'])
def match():
    data = request.get_json()
    user = data.get("user")
    liked = data.get("liked")

    # Simuler un match si l'autre profil "liked" aussi (50% chance)
    # En vrai, tu stockerais ça dans une BDD et vérifierais les deux côtés.
    is_match = random.choice([True, False])

    return jsonify({"match": is_match})

if __name__ == '__main__':
    app.run(debug=True)
