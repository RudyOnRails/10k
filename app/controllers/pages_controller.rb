class PagesController < ApplicationController

  before_filter :authenticate_user!, except: [:landing]

  def landing
    render :layout => 'landing'
  end

  def home
    
  end

end
