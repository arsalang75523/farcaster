document.getElementById("fetchData").addEventListener("click", async () => {
    const userId = prompt("Enter your Farcaster User ID:");
    if (!userId) return alert("User ID is required!");
  
    try {
      const response = await fetch(`/api/likes/${userId}`);
      const data = await response.json();
  
      const resultDiv = document.getElementById("result");
      resultDiv.innerText = `User ${data.userId} has received ${data.likesCount} likes in the last year.`;
  
      const shareButton = document.getElementById("shareData");
      shareButton.style.display = "block";
      shareButton.onclick = () => shareData(resultDiv.innerText);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data.");
    }
  });
  
  function shareData(userInfo) {
    navigator.share({
      title: "My Farcaster Data",
      text: userInfo,
    }).catch((error) => {
      console.error("Error sharing data:", error);
    });
  }
  