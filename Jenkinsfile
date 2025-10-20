pipeline {
    agent any

    stages {
        stage ("Logging in to the EC2 instance using SSH, and apllying the docker compose file") {
            steps {
                script {
                    echo "Sshing into the ec2 instance"
                sshagent (credentials:['ssh-key']) {
                sh '''

                        mkdir -p ~/.ssh
                        chmod 700 ~/.ssh
                       # Securely add host key to known_hosts to prevent MitM warnings and connection failures
                        ssh-keyscan -H ec2-3-84-155-68.compute-1.amazonaws.com >> ~/.ssh/known_hosts


                        ssh ubuntu@ec2-3-84-155-68.compute-1.amazonaws.com "
                        set -e
                        docker compose up -d
                        "
                    '''
                }
                }
            }
        }
    }
}