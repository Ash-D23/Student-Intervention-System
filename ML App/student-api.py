
from flask import Flask, request, jsonify
import pandas as pd
import pickle
app = Flask(__name__)
model = pickle.load(open('model.pkl','rb'))
@app.route('/api',methods=['POST'])
def index():
    data = request.get_json(force=True)
    dt=data['exp']
    dtest = pd.DataFrame([dt], columns = ['failures','absences','M','internships','G'])
    prediction = model.predict(dtest)
    return jsonify(str(prediction[0]))


if __name__ == '__main__':
    app.run()
