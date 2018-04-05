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
            steps {
                echo 'Getting source code...'
                checkout scm
            }
            
        }
        // Frontend
        stage('Install') {
            steps {
                echo 'Installing dependencies...'
                // `npm install` but especially for continues integration.
                sh 'npm ci --prefix=frontend'
            }
        }
        stage('Lint') { 
            steps {
                echo 'Linting...'
                sh 'npm run lint  --prefix=frontend' 
            }
        }
    }
}
