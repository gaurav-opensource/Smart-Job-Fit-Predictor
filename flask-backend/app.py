from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

# Download NLTK data
nltk.download('punkt_tab')  # Updated to punkt_tab
nltk.download('stopwords')
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

app = Flask(__name__)
CORS(app)

# Text preprocessing function
def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Tokenize
    tokens = word_tokenize(text)
    # Remove stop words
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    return ' '.join(tokens)

# TF-IDF and similarity calculation
def calculate_similarity(resume_text, job_desc_text):
    # Preprocess both texts
    resume_processed = preprocess_text(resume_text)
    job_desc_processed = preprocess_text(job_desc_text)
    
    # Create TF-IDF vectorizer
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([resume_processed, job_desc_processed])
    
    # Calculate cosine similarity
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    return similarity * 100  # Convert to percentage

# Flask API endpoint
@app.route('/match', methods=['POST'])
def match():
    try:
        data = request.get_json()
        resume_text = data.get('resume_text')
        job_desc_text = data.get('job_description')
        
        if not resume_text or not job_desc_text:
            return jsonify({'error': 'Both resume_text and job_description are required'}), 400
        
        similarity_score = calculate_similarity(resume_text, job_desc_text)
        return jsonify({
            'success': True,
            'match_percentage': round(similarity_score, 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)