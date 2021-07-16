help:
	@awk 'BEGIN {FS = ":.*##"; printf "List of available commands (usage: make \033[36m<target>\033[0m):\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-13s\033[0m%s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

start:
	@echo "Starting the application..."
	@docker-compose up
	@echo "Done."

restart_app: ## Restart the application
	@echo "Restart the application..."
	@docker-compose down
	@rm -rf dist
	@docker-compose up
	@echo "Done."

restore_db: ## Remove existing database, create new one and restart the application
	@echo "Restoring database..."
	@docker-compose down
	@rm -rf .dbdata
	@docker-compose up
	@echo "Done."
