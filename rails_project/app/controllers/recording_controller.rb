require "base64"

class RecordingController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    @recordings = Recording.all
  end

  def new
    @recording = Recording.new
  end

  def create

    
    @recording = Recording.new(recording_params)
    @recording.save 
    @recording.video_file.attach(params[:video_file])
    if (@recording.video_file.attached?)
      puts('ATTACHED')
    else 
      puts('NOOO')
    end 
    # flash[:id]
    # puts(params[:id])
    puts('THE CREATES ENDPOINT IS BEING HIT')
    # redirect_to home_path
    render :js => "window.location = '#{edit_recording_path}'"
    # redirect_to edit_recording_path 
  end


  def show
  end

  def edit
    @recording = Recording.find(params[:id])
    # @recording.update(name: params[])
  end

  def update
    redirect_to home_path
  end

  def destroy
  end

  private 
    def recording_params
      # params.require(:recording).permit(:id, :video_file, :title)
      params["recording"] = JSON.parse params["recording"]
      params["recording"]["video_file"] = Base64.decode64(params["recording"]["video_file"])
      params['recording']
      # params.require('recording').permit('video_file')
    end 

    # def upload
    #   uploaded_file = params[:video_file]
    #   File.open(Rails.root.join('public', 'uploads', uploaded_file.original_filename), 'wb') do |file|
    #     file.write(uploaded_file.read)
    #   end
    # end
    
end
