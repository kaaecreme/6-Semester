FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 5400

ENV ASPNETCORE_URLS=http://+:5400


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Nozama.InventoryService/Nozama.InventoryService.csproj", "Nozama.InventoryService/"]
RUN dotnet restore "Nozama.InventoryService/Nozama.InventoryService.csproj"
COPY . .
WORKDIR "/src/Nozama.InventoryService"
RUN dotnet build "Nozama.InventoryService.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Nozama.InventoryService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Nozama.InventoryService.dll"]
