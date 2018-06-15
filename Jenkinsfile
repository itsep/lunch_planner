pipeline {
    agent any
    environment {
        CI = 'true'
        JWT_SECRET = 'most_secret_key'
        EMAIL_SERVICE = 'gmail'
    }
    stages {
        stage('Install, Lint and Test') {
            parallel {
                stage('Shared') {
                    steps {
                        // `npm install` but especially for continues integration.
                        // sh 'npm ci --prefix=backend'
                        sh 'npm install --prefix=shared'
                        sh 'npm run lint --prefix=shared'
                        sh 'npm run test --prefix=shared'
                    }
                }
                stage('Backend') {
                    steps {
                        // `npm install` but especially for continues integration.
                        // sh 'npm ci --prefix=backend'
                        sh 'npm install --prefix=backend'
                        sh 'npm run lint --prefix=backend'
                        // 5 minute timeout
                        timeout(5) {
                            withCredentials([usernamePassword(credentialsId: 'it-sep-ci-mariadb', usernameVariable: 'DATABASE_USERNAME', passwordVariable: 'DATABASE_PASSWORD')]) {
                                withCredentials([usernamePassword(credentialsId: 'e-mail-access-data', usernameVariable: 'SENDER_EMAIL', passwordVariable: 'EMAIL_PASSWORD')]) {
                                    // available as an env variable, but will be masked if you try to print it out any which way
                                    sh 'npm run test --prefix=backend -- --maxWorkers=4'
                                }
                            }
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        // `npm install` but especially for continues integration.
                        // sh 'npm ci --prefix=frontend'
                        sh 'npm install --prefix=frontend'
                    
                        sh 'npm run lint --prefix=frontend'
                    
                        sh 'npm run test --prefix=frontend -- --maxWorkers=2'
                    
                        sh 'npm run build --prefix=frontend'
                    }
                }
            }
        }
    }
}
