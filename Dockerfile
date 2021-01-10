# set base image
FROM python:3.8

# set the working directory in the container
WORKDIR /techs_dev_test

# copy the content of the local techs_dev_test directory to the working directory
COPY . .

# command to run on container start
CMD [ "python", "./main.py" ]