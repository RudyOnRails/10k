class PagesController < ApplicationController

  before_filter :authenticate_user!, except: [:landing, :ipsum]

  def landing
    render :layout => 'landing'
  end

  def home
    @my_activities = current_user.activities
    
  end

  def user
    @user = current_user
    @my_activities = current_user.activities

  end

end
