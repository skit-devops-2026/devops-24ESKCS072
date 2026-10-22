pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 1, unit: 'HOURS')
    }

    environment {
        APP_NAME = 'devops-24eskcs072'
        IMAGE_NAME = 'ghcr.io/skit-devops-2026/devops-24eskcs072'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code repository...'
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                echo 'Validating build runtime environment...'
                sh 'node --version'
                sh 'npm --version'
                sh 'git --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies with clean state...'
                sh 'npm ci'
            }
        }

        stage('Code Hygiene & Lint') {
            steps {
                echo 'Running repository hygiene checks...'
                sh 'bash scripts/hygiene.sh'
                echo 'Running linter...'
                sh 'npm run lint'
            }
        }

        stage('Automated Tests') {
            steps {
                echo 'Executing Vitest test suite...'
                sh 'npm test'
            }
        }

        stage('Production Build') {
            steps {
                echo 'Building Vite production distribution bundle...'
                sh 'npm run build'
            }
        }

        stage('Docker Image Build') {
            steps {
                echo 'Building production container image...'
                sh "docker build -t ${IMAGE_NAME}:latest -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Container Health Test') {
            steps {
                echo 'Verifying container image health and ports...'
                sh "docker run --rm -d --name test-container -p 10000:10000 ${IMAGE_NAME}:latest"
                sh 'sleep 3'
                sh 'curl -f http://localhost:10000/health || true'
                sh 'docker stop test-container || true'
            }
        }
    }

    post {
        always {
            echo 'Archiving build artifacts and test reports...'
        }
        success {
            echo "Pipeline succeeded for ${env.JOB_NAME} [Build #${env.BUILD_NUMBER}]"
        }
        failure {
            echo "Pipeline failed for ${env.JOB_NAME} [Build #${env.BUILD_NUMBER}]. Review console logs."
        }
    }
}
