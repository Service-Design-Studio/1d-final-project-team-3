class RecordingController < ApplicationController
  # skip_before_action :verify_authenticity_token
  # skip_before_action :require_login, only: [:new, :googleAuth, :index, :edit, :show]
  
  def index
    @recordings = Recording.where user_id: session[:user_id]
  end

  def new
    @recording = Recording.new
  end

  def create
    #post method

    puts('THE CREATES ENDPOINT IS BEING HIT')
    render js: "#{home_path}"

    # params[:user_id] = current_user
    # p recording_params
    @recording = Recording.new(recording_params)
    p session[:user_id].class
    @recording.user_id = session[:user_id]
    @recording.video_file.attach(recording_params[:video_file])
    @recording.save
    if (@recording.video_file.attached?)
      puts('ATTACHED')
    else 
      puts('NOOO')
    end 
  end


  def show
  end

  def edit
    @recording = Recording.find(params[:id])
    p @recording
  end

  def update
    @recording = Recording.find(params[:id])
    @recording.update(recording_params)
    redirect_to home_path alert: 'Recording was updated!'

  end

  def destroy
    @recording = Recording.find(params[:id])
    @recording.video_file.purge
    @recording.destroy
    redirect_to home_path
  end

  private 
    def recording_params
      params.require(:recording).permit(:video_file,:title,:transcription)
    end 

    def upload
      uploaded_file = params[:video_file]
      File.open(Rails.root.join('public', 'uploads', uploaded_file.original_filename), 'wb') do |file|
        file.write(uploaded_file.read)
      end
    end
    
end
