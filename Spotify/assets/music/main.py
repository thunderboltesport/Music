from pytube import YouTube

def download_youtube_audio(url, output_path='.'):
    # Create a YouTube object
    yt = YouTube(url)

    # Get the audio stream with the highest bitrate
    audio_stream = yt.streams.filter(only_audio=True).order_by('abr').desc().first()

    if audio_stream:
        # Download the audio stream
        audio_stream.download(output_path=output_path, filename=yt.title + ".mp3")
        print(f"Downloaded: {yt.title}.mp3")
    else:
        print("No audio stream found for the video")

if __name__ == "__main__":
    video_url = input("Enter the YouTube video URL: ")
    download_youtube_audio(video_url)
