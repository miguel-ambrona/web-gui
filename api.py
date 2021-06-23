#!/usr/bin/python3

from flask import Flask, request, jsonify
from subprocess import Popen, PIPE, STDOUT
import json
import os

app = Flask(__name__)

ANALYZER = 'cat'

@app.route('/web-gui/', methods=['GET', 'POST'])
def analyze():
    if request.method == 'GET':
        return 1

    if request.method == 'POST':
        data = request.form
        answer = {'cmd' : data['cmd'] }

        try:
            if data['cmd'] == 'ls':
                ls = Popen(['find', './examples'], stdout=PIPE).communicate()[0].decode('utf-8')
                files = [f for f in ls.split('\n') if f[-4:] == '.txt']
                answer['files'] = files

            if data['cmd'] == 'open':
                content = ""
                with open(data['file'], 'r') as f:
                    for line in f.readlines():
                        content += line
                answer['content'] = content

            if data['cmd'] == 'save':
                with open(data['file'], 'w') as f:
                    f.write(data['lines'])

            if data['cmd'] == 'analyze':
                with open('/tmp/infile', 'w') as f:
                    f.write(data['input'])

                os.system(ANALYZER + ' /tmp/infile > /tmp/outfile 2> /tmp/errfile')

                with open('/tmp/outfile', 'r') as f:
                    answer['output'] = []
                    for line in f.readlines():
                        answer['output'].append(line)

                with open('/tmp/errfile', 'r') as f:
                    answer['error'] = []
                    for line in f.readlines():
                        answer['error'].append(line)
        except:
            pass

        response = jsonify(answer)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)
