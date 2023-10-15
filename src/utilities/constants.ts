export interface MentorVerificationData {
    certificates: {
        certificationName: string;
        issuingInstitution: string;
        graduationYear: string;
        graduationFile: File | null;
    };

    qualifications: {
        qualification: string;
        yearsExperience: string;
        qualificationDesc: string;
    };

    achievements: {
        achievementName: string;
        issuingOrganization: string;
        yearReceived: string;
        achievementDesc: string;
    };

    identification: {
        fullname: string;
        dateofBirth: string;
        idType: string;
        idNumber: string;
        uploadID: File | null;
    };
}
