export const getFamilies = async () => {
    try {
        const families = await fetch("http://159.89.165.67/api/member/viewFamilies", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return families.json();
    }catch(error){
        throw error;
    }
}

export const addMember = async ({id, familyID, memberData}) => {
    try {
        const payload = {
            familyID: familyID,
            memberData,
        };
        const member = await fetch(`http://159.89.165.67/api/member/addMember/${id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        return member;
    } catch (error) {
        console.error("Error adding member:", error);
        throw error;
    }
}

export const updateMember = async (id, memberId, memberData) => {
    try {
      const response = await fetch(`http://159.89.165.67/api/member/update/${id}/${memberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({memberData}),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Member updated successfully');
      } else {
        alert(`Failed to update member: ${result.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  export const deleteMember = async (id, memberId) => {
    try {
      const response = await fetch(`http://159.89.165.67/api/member/delete/${id}/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert('Member deleted successfully');
      } else {
        alert(`Failed to delete member: ${result.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };