class RecordingController < ApplicationController
  # skip_before_action :verify_authenticity_token
  skip_before_action :require_login, only: [:new, :googleAuth, :index, :edit, :show]
  
  def index
    @recordings = Recording.all
  end

  def new
    @recording = Recording.new
  end

  def create

    puts('THE CREATES ENDPOINT IS BEING HIT')
    # params[:user_id] = current_user
    # p recording_params
    @recording = Recording.new(recording_params)
    p session[:user_id].class
    @recording.user_id = session[:user_id]
    @recording.video_file.attach(params[:video_file])
    @recording.save
    if (@recording.video_file.attached?)
      puts('ATTACHED')
    else 
      puts('NOOO')
    end 
    # flash[:id]
    # puts(params[:id])
    redirect_to home_path
    # render :js => "window.location = '/recording/edit'"
    # redirect_to edit_recording_path 
  end


  def show
  end

  def edit
  end

  def update
    redirect_to home_path
  end

  def destroy
  end

  private 
    def  recording_params
      params.require(:recording).permit(:video_file)
    end 

    def upload
      uploaded_file = params[:video_file]
      File.open(Rails.root.join('public', 'uploads', uploaded_file.original_filename), 'wb') do |file|
        file.write(uploaded_file.read)
      end
    end
    
end
