pipeline {
    agent any
    environment {
        CI = 'true' 
    }
    stages {
        stage('Install Backend') {
            steps {
                // `npm install` but especially for continues integration.
                // sh 'npm ci --prefix=backend'
                sh 'npm install --prefix=backend'
            }
        }
        stage('Lint Backend') {
            steps {
                sh 'npm run lint --prefix=backend'
            }
        }
        stage('Install Frontend') {
            steps {
                // `npm install` but especially for continues integration.
                // sh 'npm ci --prefix=frontend'
                sh 'npm install --prefix=frontend'
            }
        }
        stage('Lint Frontend') {
            steps {
                sh 'npm run lint --prefix=frontend'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'npm run build --prefix=frontend'
            }
        }
    }
}