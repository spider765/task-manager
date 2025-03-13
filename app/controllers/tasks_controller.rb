class TasksController < ApplicationController
  def new
    @task = Task.new
    respond_to do |format|
      format.turbo_stream { render turbo_stream: turbo_stream.update('modal-body', partial: 'tasks/form', locals: { task: @task }) }
      format.html
    end
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.prepend('tasks', partial: 'tasks/task', locals: { task: @task }) }
        format.html { redirect_to tasks_path, notice: 'Task created!' }
      end
    else
      render turbo_stream: turbo_stream.update('modal-body', partial: 'tasks/form', locals: { task: @task })
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :due_date)
  end
end
