from flask_cors import CORS
from flask import Flask, request, jsonify
# import mysql.connector
import psycopg2
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


def converter_data_ptbr_para_iso(data_ptbr):
    if not data_ptbr:
        return None
    try:
        return datetime.strptime(data_ptbr, "%d/%m/%Y").date()
    except ValueError:
        print(f"⚠️ Data inválida recebida: {data_ptbr}")
        return None


def get_db_connection():
    try:
        return psycopg2.connect(
            host=os.getenv("DB_HOST", "127.0.0.1"),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD", "victorgabriel337"),
            database=os.getenv("DB_NAME", "igreja"),
            port=int(os.getenv("DB_PORT", 3306))
        )
    except psycopg2.Error as err:
        print("🚨 Erro de conexão com o banco de dados:", err)
        raise


@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    dados = request.json

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO cadastro (
            nome, nascimento, telefone, naturalidade, sexo, estado_civil,
            conjuge, endereco, bairro, cidade, cep, batismo, emissao, foto
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        values = (
            dados.get("nome"),
            converter_data_ptbr_para_iso(dados.get("nascimento")),
            dados.get("telefone"),
            dados.get("natural"),
            dados.get("sexo"),
            dados.get("estadoCivil"),
            dados.get("conjugue"),
            dados.get("endereco"),
            dados.get("bairro"),
            dados.get("cidade"),
            dados.get("cep"),
            converter_data_ptbr_para_iso(dados.get("batismo")),
            converter_data_ptbr_para_iso(dados.get("dataEmissao")),
            dados.get("foto")
        )

        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"mensagem": "✅ Cadastro realizado com sucesso!"}), 201

    except mysql.connector.Error as e:
        print("❌ Erro ao inserir no banco:", e)
        return jsonify({"erro": f"Erro ao cadastrar no banco de dados: {str(e)}"}), 500
    except Exception as e:
        print("❌ Erro inesperado:", e)
        return jsonify({"erro": f"Erro inesperado: {str(e)}"}), 500


@app.route("/cadastros", methods=["GET"])
def listar_cadastros():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM cadastro ORDER BY nome")
        cadastros = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(cadastros), 200
    except Exception as e:
        print("Erro ao buscar cadastros:", e)
        return jsonify({"erro": "Erro ao buscar cadastros"}), 500



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")