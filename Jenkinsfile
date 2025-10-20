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


                        ssh ubuntu@ec2-3-84-155-68.compute-1.amazonaws.com <<EOF
                                set -e
                                if [ ! -d "docker-nodejs-with-mongodb" ]; then
                                    git clone https://github.com/Roslaan001/docker-nodejs-with-mongodb.git
                                else
                                    cd docker-nodejs-with-mongodb
                                    
                                fi
                                
                                docker compose up -d
                            EOF
                    '''
                }
                }
            }
        }
    }
}