FROM google/cloud-sdk:alpine
RUN apk --update add openjdk7-jre
RUN gcloud components install --quiet beta pubsub-emulator
EXPOSE 8085
CMD ["gcloud", "beta", "emulators", "pubsub", "start", "--host-port", "0.0.0.0:8085"]