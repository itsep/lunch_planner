pipeline {
    agent any
    environment {
        CI = 'true' 
    }
    stages {
        stage('Install') {
            parallel {
                stage('Install Frontend') {
                    steps {
                        // `npm install` but especially for continues integration.
                        // sh 'npm ci --prefix=frontend'
                        sh 'npm install --prefix=frontend'
                    }
                }
                stage('Install Backend') {
                    steps {
                        // `npm install` but especially for continues integration.
                        // sh 'npm ci --prefix=backend'
                        sh 'npm install --prefix=backend'
                    }
                }
            }
        }
        stage('Lint') {
            parallel {
                stage('Lint Frontend') {
                    steps {
                        sh 'npm run lint --prefix=frontend'
                    }
                }
                stage('Lint Backend') {
                    steps {
                        sh 'npm run lint --prefix=backend'
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'npm run build --prefix=frontend'
            }
        }
    }
}
