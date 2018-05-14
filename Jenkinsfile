pipeline {
    agent any
    environment {
        CI = 'true'
        JWT_SECRET = 'most_secret_key'
    }
    stages {
        stage('Install Shared') {
            steps {
                // `npm install` but especially for continues integration.
                // sh 'npm ci --prefix=backend'
                sh 'npm install --prefix=shared'
            }
        }
        stage('Lint Shared') {
            steps {
                sh 'npm run lint --prefix=shared'
            }
        }
        stage('Test Shared') {
            steps {
                sh 'npm run test --prefix=shared'
            }
        }
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
        stage('Test Backend') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'it-sep-ci-mariadb', usernameVariable: 'DATABASE_USERNAME', passwordVariable: 'DATABASE_PASSWORD')]) {
                    // available as an env variable, but will be masked if you try to print it out any which way
                    sh 'npm run test --prefix=backend'
                }
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
        stage('Test Frontend') {
            steps {
                sh 'npm run test --prefix=frontend'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'npm run build --prefix=frontend'
            }
        }
    }
}

