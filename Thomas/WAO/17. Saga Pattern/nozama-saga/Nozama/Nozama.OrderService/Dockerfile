FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5300

ENV ASPNETCORE_URLS=http://+:5300

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Nozama.OrderService/Nozama.OrderService.csproj", "Nozama.OrderService/"]
RUN dotnet restore "Nozama.OrderService/Nozama.OrderService.csproj"
COPY . .
WORKDIR "/src/Nozama.OrderService"
RUN dotnet build "Nozama.OrderService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Nozama.OrderService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Nozama.OrderService.dll"]