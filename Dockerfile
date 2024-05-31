FROM maven:3.9.7-eclipse-temurin-17 as build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-alpine3.14
COPY --from=build /target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]