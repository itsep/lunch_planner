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
        stage('Test Backend') {
            withCredentials([usernamePassword(credentialsId: 'it-sep-ci-mariadb', usernameVariable: 'DATABASE_USERNAME', passwordVariable: 'DATABASE_PASSWORD')]) {
              // available as an env variable, but will be masked if you try to print it out any which way
              // note: single quotes prevent Groovy interpolation; expansion is by Bourne Shell, which is what you want
              sh 'echo $DATABASE_PASSWORD'
              // also available as a Groovy variable
              echo DATABASE_USERNAME
              // or inside double quotes for string interpolation
              echo "username is $DATABASE_USERNAME"

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
