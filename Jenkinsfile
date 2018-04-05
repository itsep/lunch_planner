pipeline {
    agent any
    environment {
        CI = 'true' 
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Getting source code...'
                checkout scm
            }
            
        }
        // Frontend
        stage('Fronted Install') {
            steps {
                echo 'Installing dependencies...'
                // `npm install` but especially for continues integration.
                // sh 'npm ci --prefix=frontend'
                sh 'npm install --prefix=frontend'
            }
        }
        stage('Frontend Lint') { 
            steps {
                echo 'Linting...'
                sh 'npm run lint  --prefix=frontend' 
            }
        }
        // Backed
        stage('Backend Install') {
            steps {
                echo 'Installing dependencies...'
                // `npm install` but especially for continues integration.
                // sh 'npm ci --prefix=frontend'
                sh 'npm install --prefix=backend'
            }
        }
        stage('Backend Lint') { 
            steps {
                echo 'Linting...'
                sh 'npm run lint  --prefix=backend' 
            }
        }
    }
}
