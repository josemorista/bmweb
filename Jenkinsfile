pipeline {
    agent any

		environment {
			artifact = 'bmwartifact.tgz'
			directory = '/home/ubuntu/bmweb'
			host = 'ec2-34-203-244-243.compute-1.amazonaws.com'
		}

    tools {nodejs "nodejs"}

    stages {
        stage('Build') { 
            steps {
							sh """
                npm install
								cp ./.env.sample ./.env
								npm run build
								tar czf $artifact build
								scp ./$artifact ubuntu@$host:/tmp/$artifact
								rm -rf ./*
							"""
            }
        }

				stage('Publish') {
					steps {
						sh """
							ssh ubuntu@$host << EOF 
							mkdir -p $directory
							rm -rf $directory/*
							tar -xf /tmp/$artifact -C $directory
							rm /tmp/$artifact
							cd $directory
							pm2 delete process.json &> /dev/null
							pm2 start process.json
EOF"""
					}
				}
    }
}