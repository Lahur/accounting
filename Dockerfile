FROM openjdk:8-jdk-alpine
ARG JAR_FILE=banking-parent/banking-web/target/*.war
COPY ${JAR_FILE} app.war
ENTRYPOINT ["java","-jar","/app.war"]
