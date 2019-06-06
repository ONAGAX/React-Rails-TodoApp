class TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos
  end

  def create
    @todos = Todo.create(todo: params[:todo])
    render json: @todos
  end

  def destroy
    @todo = Todo.find(params[:id])
    if @todo.destroy
      head :no_content, status: :ok
    else
      render json: @todo.error, status: :unprocessable_entity
    end
  end
end
