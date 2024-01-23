docker build --platform=linux/amd64 -t fastfoodcustomer ../
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 914643601265.dkr.ecr.us-east-1.amazonaws.com
docker tag fastfoodcustomer:latest 914643601265.dkr.ecr.us-east-1.amazonaws.com/fastfoodcustomer:latest
docker push 914643601265.dkr.ecr.us-east-1.amazonaws.com/fastfoodcustomer:latest