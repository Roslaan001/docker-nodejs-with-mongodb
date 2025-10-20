pipeline {
    agent any

    stages {
        stage("Logging in to the EC2 instance using SSH, and applying the docker compose file") {
            steps {
                script {
                    echo "SSH-ing into the EC2 instance"
                    sshagent(credentials: ['ssh-key']) {
                        sh '''
                            mkdir -p ~/.ssh
                            chmod 700 ~/.ssh
                            ssh-keyscan -H ec2-3-84-155-68.compute-1.amazonaws.com >> ~/.ssh/known_hosts

                            ssh ubuntu@ec2-3-84-155-68.compute-1.amazonaws.com <<EOF
set -e
if [ ! -d "docker-nodejs-with-mongodb" ]; then
    git clone https://github.com/Roslaan001/docker-nodejs-with-mongodb.git
    cd docker-nodejs-with-mongodb
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
