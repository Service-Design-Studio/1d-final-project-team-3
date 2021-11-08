class RecordingController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    
  end

  def create
    #TODO SAVE THE VIDEO INSIDE RECORDING DB TABLE
    #REDIRECT TO CORRECT ID EDIT PAGE
    # skip_before_action :verify_authenticity_token

    puts('THE CREATES ENDPOINT IS BEING HIT')
    redirect_to edit_recording_path 1
  end

  def new
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
