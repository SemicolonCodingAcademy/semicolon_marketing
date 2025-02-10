// EmailJS 초기화
(function() {
    emailjs.init("xF98zinzSdHs9bKcO"); // EmailJS 대시보드에서 찾을 수 있는 Public Key
    console.log("EmailJS initialized"); // 초기화 확인
})();

// 폼 제출 처리
document.getElementById('inquiryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Form submitted"); // 폼 제출 확인

    // 로딩 상태 표시
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송중...';
    submitButton.disabled = true;

    // 폼 데이터 수집
    const formData = {
        company: this.company.value,
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        service: this.service.value,
        message: this.message.value
    };
    console.log("Form data:", formData); // 폼 데이터 확인

    // Promise.all을 사용하여 두 개의 이메일을 동시에 발송
    Promise.all([
        // 사용자에게 발송
        emailjs.send(
            "service_8ao15lp",
            "template_ov15cfu",
            {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message
            }
        ),
        // 관리자에게 발송
        emailjs.send(
            "service_8ao15lp",
            "template_5giucjj",
            {
                company: formData.company,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                service: formData.service,
                message: formData.message
            }
        )
    ])
    .then(function(responses) {
        console.log("Emails sent successfully:", responses); // 성공 응답 확인
        submitButton.innerHTML = '<i class="fas fa-check"></i> 전송 완료';
        
        Swal.fire({
            icon: 'success',
            title: '상담 신청이 완료되었습니다',
            text: '확인 이메일이 발송되었습니다. 빠른 시일 내에 답변 드리도록 하겠습니다.',
            confirmButtonText: '확인'
        });

        document.getElementById('inquiryForm').reset();

        setTimeout(() => {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }, 2000);
    })
    .catch(function(error) {
        console.error("Email sending failed:", error); // 에러 상세 확인
        
        Swal.fire({
            icon: 'error',
            title: '전송 실패',
            text: '죄송합니다. 다시 시도해주세요.',
            confirmButtonText: '확인'
        });

        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    });
}); 