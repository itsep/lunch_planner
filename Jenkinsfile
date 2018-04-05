pipeline {
    agent any
    tools {
        nodejs 'NodeJS LTS 8.11.x'
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Checkout') {
            echo 'Getting source code...'
            checkout scm
        }
        // Frontend
        stage('Install') {
            echo 'Installing dependencies...'
            steps {
                // `npm install` but especially for continues integration.
                sh 'npm ci --prefix=frontend'
            }
        }
        stage('Lint') { 
            echo 'Linting...'
            steps {
                sh 'npm run lint  --prefix=frontend' 
            }
        }
    }
}
