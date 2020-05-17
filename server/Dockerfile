FROM ubuntu:latest
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
COPY . /server
WORKDIR /server
RUN pip install -r requirements.txt
RUN pip install Flask
RUN pip install flask
ENTRYPOINT ["python"]
CMD ["app.py"]
