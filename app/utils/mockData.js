const { success } = require('./responseHelper')

// utils/mockData.js
const MOCK_RESPONSES = {
  aadhaar_validation: {
    success: {
      data: {
        data: {
          client_id: 'aadhaar_validation_DrkubmqOomYGMmWlvUmt',
          age_range: '20-30',
          aadhaar_number: '917646971298',
          state: 'Gujarat',
          gender: 'M',
          last_digits: '329',
          is_mobile: true,
          remarks: 'success',
          less_info: false
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'aadhaar_validation_bFlNHqzgHeGSfpOihIbz',
          age_range: null,
          aadhaar_number: '443205881234',
          state: null,
          gender: null,
          last_digits: null,
          is_mobile: null,
          remarks: 'invalid_aadhaar_format',
          less_info: false
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  driving_license: {
    success: {
      data: {
        data: {
          client_id: 'license_iDdklSZIkxXfDrhVupRZ',
          license_number: 'TS02620190003657',
          state: 'Uttar Pradesh',
          name: 'MUNNA BHAIYA',
          permanent_address: 'TRIPATHI HAVELI, MIRZAPUR, UTTAR PRADESH',
          permanent_zip: '',
          temporary_address: 'TRIPATHI HAVELI, MIRZAPUR, UTTAR PRADESH',
          temporary_zip: '',
          citizenship: '',
          ola_name: 'RTA MAHABUBABAD',
          ola_code: 'TS026',
          gender: 'M',
          father_or_husband_name: 'KALEEN BHAIYA',
          dob: '1998-06-15',
          doe: '2039-07-23',
          transport_doe: '1800-01-01',
          doi: '2019-07-24',
          transport_doi: '1800-01-01',
          profile_image: 'base64Image',
          has_image: true,
          blood_group: '',
          vehicle_classes: ['MCWG', 'LMV-NT'],
          less_info: false
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'license_tkrawxSTiBqADpYgphxj',
          license_number: 'MH03201400155',
          state: null,
          name: null,
          permanent_address: null,
          permanent_zip: null,
          temporary_address: null,
          temporary_zip: null,
          citizenship: null,
          ola_name: null,
          ola_code: null,
          gender: null,
          father_or_husband_name: null,
          dob: '1940-06-21',
          doe: null,
          transport_doe: null,
          doi: null,
          transport_doi: null,
          profile_image: null,
          has_image: false,
          blood_group: null,
          vehicle_classes: [],
          less_info: false,
          additional_check: [],
          initial_doi: null,
          current_status: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: null
      }
    }
  },
  rc_text: {
    success: {
      data: {
        data: {
          client_id: 'rc_dSpdBzqCodglkkoQkmeu',
          rc_number: 'AB12CD3456',
          registration_date: '2017-09-05',
          owner_name: 'Munna Bhaiya',
          father_name: 'Kaleen Bhaiya',
          present_address: 'HNO 1-10/2 Mirzapur',
          permanent_address: 'HNO 1-10/2 Mirzapur',
          mobile_number: '',
          vehicle_category: 'HPV',
          vehicle_chasi_number: 'ABCD12LRT0HH123456',
          vehicle_engine_number: 'ABCD12H123456',
          maker_description: 'VEHICLES LTD',
          maker_model: 'EICHER PRO BSIV',
          body_type: 'SALOON',
          fuel_type: 'DIESEL',
          color: 'WHITE',
          norms_type: 'BHARAT STAGE IV',
          fit_up_to: '2099-09-00',
          financer: 'FINANCE LTD',
          financed: true,
          insurance_company: 'Assurance Company Limited',
          insurance_policy_number: '0000023123456789',
          insurance_upto: '2099-00-04',
          manufacturing_date: '8/1947',
          manufacturing_date_formatted: '1947-08',
          registered_at: 'RTO',
          latest_by: '1497-00-27',
          less_info: true,
          tax_upto: null,
          tax_paid_upto: '1857-11-30',
          cubic_capacity: '3298',
          vehicle_gross_weight: '9850',
          no_cylinders: '4',
          seat_capacity: '50',
          sleeper_capacity: null,
          standing_capacity: null,
          wheelbase: '5260',
          unladen_weight: '6110',
          vehicle_category_description: 'Bus',
          pucc_number: '',
          pucc_upto: null,
          permit_number: '123/AB/45/64',
          permit_issue_date: null,
          permit_valid_from: null,
          permit_valid_upto: '2080-11-06',
          permit_type: 'TEMPORARY PERMIT',
          national_permit_number: null,
          national_permit_upto: null,
          national_permit_issued_by: null,
          non_use_status: null,
          non_use_from: null,
          non_use_to: null,
          blacklist_status: null,
          noc_details: null,
          owner_number: '1',
          rc_status: null,
          masked_name: false,
          challan_details: null,
          variant: null
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'rc_AxQofuGjQZhrvzhauaul',
          rc_number: 'KA12AC3456',
          registration_date: null,
          owner_name: null,
          father_name: null,
          present_address: null,
          permanent_address: null,
          mobile_number: null,
          vehicle_category: null,
          vehicle_chasi_number: null,
          vehicle_engine_number: null,
          maker_description: null,
          maker_model: null,
          body_type: null,
          fuel_type: null,
          color: null,
          norms_type: null,
          fit_up_to: null,
          financer: null,
          financed: null,
          insurance_company: null,
          insurance_policy_number: null,
          insurance_upto: null,
          manufacturing_date: null,
          manufacturing_date_formatted: null,
          registered_at: null,
          latest_by: null,
          less_info: false,
          tax_upto: null,
          tax_paid_upto: null,
          cubic_capacity: null,
          vehicle_gross_weight: null,
          no_cylinders: null,
          seat_capacity: null,
          sleeper_capacity: null,
          standing_capacity: null,
          wheelbase: null,
          unladen_weight: null,
          vehicle_category_description: null,
          pucc_number: null,
          pucc_upto: null,
          permit_number: null,
          permit_issue_date: null,
          permit_valid_from: null,
          permit_valid_upto: null,
          permit_type: null,
          national_permit_number: null,
          national_permit_upto: null,
          national_permit_issued_by: null,
          non_use_status: null,
          non_use_from: null,
          non_use_to: null,
          blacklist_status: null,
          noc_details: null,
          owner_number: null,
          rc_status: null,
          masked_name: false,
          challan_details: null,
          variant: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: null
      }
    }
  },
  pan_comprehensive: {
    success: {
      data: {
        data: {
          client_id: 'pan_comprehensive_iEFYQybrNHIpKguuYQkd',
          pan_number: 'CQNPP8141A',
          full_name: 'JHON DOE',
          full_name_split: ['JHON', '', 'DOE'],
          masked_aadhaar: 'XXXXXXXX9337',
          address: {
            line_1: '',
            line_2: '',
            street_name: '',
            zip: '',
            city: '',
            state: '',
            country: '',
            full: ''
          },
          email: null,
          phone_number: null,
          gender: 'M',
          dob: '1994-12-01',
          input_dob: null,
          aadhaar_linked: true,
          dob_verified: false,
          dob_check: false,
          category: 'person',
          status: 'valid',
          less_info: false
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'pan_comprehensive_iEFYQybrNHIpKguuYQkd',
          pan_number: 'CQNPP8141A',
          full_name: null,
          full_name_split: null,
          masked_aadhaar: null,
          address: {
            line_1: '',
            line_2: '',
            street_name: '',
            zip: '',
            city: '',
            state: '',
            country: '',
            full: ''
          },
          email: null,
          phone_number: null,
          gender: null,
          dob: null,
          input_dob: null,
          aadhaar_linked: true,
          dob_verified: false,
          dob_check: false,
          category: 'person',
          status: 'invalid',
          less_info: false
        },
        status_code: 422,
        success: false,
        message: 'Invalid PAN',
        message_code: 'null'
      }
    }
  },
  pan_lite: {
    success: {
      data: {
        data: {
          client_id: 'pan_fAgJjMDrkcdPrfhbjxSM',
          pan_number: 'CQNPP4191A',
          full_name: 'JHON DOE',
          category: 'person'
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'pan_fAgJjMDrkcdPrfhbjxSM',
          pan_number: 'CQNPP6191A',
          full_name: null,
          category: null
        },
        status_code: 422,
        success: false,
        message: 'Invalid PAN',
        message_code: null
      }
    }
  },
  voter_id: {
    success: {
      data: {
        data: {
          relation_type: 'F',
          gender: 'M',
          age: '32',
          epic_no: 'NLN2089125',
          client_id: 'bkpkzZyaaQ',
          dob: '1990-08-31',
          relation_name: 'KALEEN BHAIYA',
          name: 'MUNNA BHAIYA',
          area: 'Mirzapur',
          state: 'Uttar Pradesh',
          house_no: 'Tripathi Haveli'
        },
        status_code: 200,
        message: 'VoterId Fecthed successfully',
        success: true
      }
    },
    failure: {
      data: {
        data: {
          relation_type: null,
          gender: null,
          age: null,
          epic_no: 'NLN208912',
          client_id: null,
          dob: null,
          relation_name: null,
          name: null,
          area: null,
          state: null,
          house_no: null
        },
        status_code: 422,
        success: false,
        message: 'Invalid VoterId',
        message_code: null
      }
    }
  },
  bank_verification: {
    success: {
      data: {
        data: {
          client_id: 'bank_validation_pjTDReiGjNBputtmJIGC',
          account_exists: true,
          upi_id: null,
          full_name: 'A YADAV',
          remarks: '',
          ifsc_details: {
            id: 0,
            ifsc: 'CNRB0000000',
            micr: '123456789',
            iso3166: 'IN-UP',
            swift: null,
            bank: 'C Bank',
            bank_code: 'CNRB',
            bank_name: 'C Bank',
            branch: 'AGRA',
            centre: 'AGRA',
            district: 'AGRA',
            state: 'UTTAR PRADESH',
            city: 'AGRA',
            address: 'AAGRA (UP',
            contact: '+911234567890',
            imps: true,
            rtgs: true,
            neft: true,
            upi: true,
            micr_check: true
          }
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'bank_validation_GqyHCvJZSuRtogcjyoCi',
          account_exists: false,
          upi_id: null,
          full_name: null,
          remarks: '',
          ifsc_details: {}
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  bank_verification_pennyless: {
    success: {
      data: {
        data: {
          client_id: 'bank_validation_pjTDReiGjNBputtmJIGC',
          account_exists: true,
          upi_id: null,
          full_name: 'A YADAV',
          remarks: '',
          ifsc_details: {
            id: 0,
            ifsc: 'CNRB0000000',
            micr: '123456789',
            iso3166: 'IN-UP',
            swift: null,
            bank: 'C Bank',
            bank_code: 'CNRB',
            bank_name: 'C Bank',
            branch: 'AGRA',
            centre: 'AGRA',
            district: 'AGRA',
            state: 'UTTAR PRADESH',
            city: 'AGRA',
            address: 'AAGRA (UP',
            contact: '+911234567890',
            imps: true,
            rtgs: true,
            neft: true,
            upi: true,
            micr_check: true
          }
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'bank_pennyless_isWozyEnjGzhYsAhCZJD',
          account_exists: false,
          upi_id: null,
          full_name: null,
          remarks: '',
          ifsc_details: {}
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  corporate_cin: {
    success: {
      data: {
        data: {
          client_id: 'company_VxnpnqIgEtFTmTlDpucz',
          company_id: 'U65999MH1995PLC123456',
          company_type: 'Company',
          company_name: 'FINSERV LIMITED',
          details: {
            company_info: {
              cin: 'U65999MH1995PLC123456',
              roc_code: 'Mumbai',
              registration_number: '123456',
              company_category: 'Company limited by Shares',
              class_of_company: 'Public',
              company_sub_category: 'Non-govt company',
              authorized_capital: '1750000000',
              paid_up_capital: '1500000000',
              number_of_members: '0',
              date_of_incorporation: '1995-03-14',
              registered_address:
                'J.B. Nagar Metro Station, J.B. Nagar, Andheri (E) Mumbai Mumbai City MH 400059 IN',
              address_other_than_ro: '-',
              email_id: 'nikita.@FINSERV.com',
              listed_status: 'Unlisted',
              active_compliance: null,
              suspended_at_stock_exchange: '-',
              last_agm_date: '2023-09-06',
              last_bs_date: '2023-03-31',
              company_status: 'Active',
              status_under_cirp: null
            },
            directors: [
              {
                din_number: '123456',
                director_name: 'AMIT GOYAL',
                start_date: '2014-08-04',
                end_date: '1800-01-01',
                surrendered_din: null
              },
              {
                din_number: '456789',
                director_name: 'CHANDRASHEKHAR GURUSWAMY AIYAR',
                start_date: '2016-03-30',
                end_date: '1800-01-01',
                surrendered_din: null
              },
              {
                din_number: '987456',
                director_name: 'AMIT KHANDELWAL',
                start_date: '2014-08-04',
                end_date: '1800-01-01',
                surrendered_din: null
              },
              {
                din_number: '654321',
                director_name: 'AMITH AGARWAL',
                start_date: '2014-08-04',
                end_date: '1800-01-01',
                surrendered_din: null
              }
            ],
            charges: [
              {
                assets_under_charge: ' Book debts',
                charge_amount: '150000000',
                date_of_creation: '2015-10-20',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge: ' Book debts',
                charge_amount: '140000000',
                date_of_creation: '2015-12-15',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge: ' Book debts',
                charge_amount: '500000000',
                date_of_creation: '2015-11-04',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge: ' Book debts',
                charge_amount: '50000000',
                date_of_creation: '2015-08-31',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge: ' Book debts; Standard asset portfolio',
                charge_amount: '50000000',
                date_of_creation: '2016-08-30',
                date_of_modification: '1800-01-01',
                status: 'OPEN'
              },
              {
                assets_under_charge: ' Book debts',
                charge_amount: '100000000',
                date_of_creation: '2016-07-29',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge: ' Book debts; Loan Assets, Receivables',
                charge_amount: '250000000',
                date_of_creation: '2016-08-22',
                date_of_modification: '1800-01-01',
                status: 'OPEN'
              },
              {
                assets_under_charge: ' Book debts; Standard asset portfolio',
                charge_amount: '150000000',
                date_of_creation: '2016-08-30',
                date_of_modification: '1800-01-01',
                status: 'OPEN'
              },
              {
                assets_under_charge: ' Book debts; Receivables',
                charge_amount: '100000000',
                date_of_creation: '2016-09-28',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge:
                  ' Book debts; Receivables(Present & Future) /Corporate Guarantee',
                charge_amount: '250000000',
                date_of_creation: '2016-12-29',
                date_of_modification: '1800-01-01',
                status: 'OPEN'
              }
            ]
          }
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'company_NTrScxUiqrlAPfrgaWVm',
          company_id: 'U65999MH1995PLC123456',
          company_type: null,
          company_name: null,
          details: {}
        },
        status_code: 422,
        success: false,
        message: 'Invalid Company ID',
        message_code: null
      }
    }
  },
  corporate_gstin: {
    success: {
      data: {
        data: {
          address_details: {},
          client_id: 'corporate_gstin_hemuprVyNGvtQAvRJHXy',
          gstin: '08AKWPJ1234H1ZN',
          pan_number: 'AKWPJ1234H',
          business_name: 'MINDA MARWAR PRODUCER COMPANY',
          legal_name: 'MADAN LAL JAT',
          center_jurisdiction:
            'Commissionerate - JODHPUR,Division - GST DIVISION',
          state_jurisdiction: 'State - Rajasthan,Zone',
          date_of_registration: '2021-10-20',
          constitution_of_business: 'Proprietorship',
          taxpayer_type: 'Regular',
          gstin_status: 'Active',
          date_of_cancellation: '1800-01-01',
          field_visit_conducted: 'No',
          nature_bus_activities: ['Retail Business', 'Wholesale Business'],
          nature_of_core_business_activity_code: 'NA',
          nature_of_core_business_activity_description: 'NA',
          aadhaar_validation: 'Yes',
          aadhaar_validation_date: '2021-10-20',
          filing_status: [],
          address: 'MINDA NAVA, WARD NO. 15, VILL. BHEEVPURA',
          hsn_info: {},
          filing_frequency: []
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          address_details: {},
          client_id: 'corporate_gstin_HIvlvWHedktKajhzlcTs',
          gstin: '08AKWPJ1234H1ZN',
          pan_number: null,
          business_name: null,
          legal_name: null,
          center_jurisdiction: null,
          state_jurisdiction: null,
          date_of_registration: null,
          constitution_of_business: null,
          taxpayer_type: null,
          gstin_status: null,
          date_of_cancellation: null,
          field_visit_conducted: null,
          nature_bus_activities: [],
          nature_of_core_business_activity_code: null,
          nature_of_core_business_activity_description: null,
          aadhaar_validation: null,
          aadhaar_validation_date: null,
          filing_status: [],
          address: null,
          hsn_info: {},
          filing_frequency: []
        },
        status_code: 422,
        success: false,
        message: 'Invalid GSTIN',
        message_code: null
      }
    }
  },
  credit_report: {
    success: {
      data: {
        data: {
          client_id: 'credit_report_v2_umOnUcqlxqevWQtIGHXQ',
          id_number: '********5514',
          id_type: 'aadhaar',
          mobile: '8079012345',
          name: 'Vishal Rathore',
          credit_score: '799',
          credit_report: {
            InquiryResponseHeader: {
              ClientID: 'randomClientID987',
              CustRefField: '654321',
              ReportOrderNO: '98765432',
              ProductCode: ['CREDRPT'],
              SuccessCode: '2',
              Date: '2023-11-20',
              Time: '12:45:30'
            },
            InquiryRequestInfo: {
              InquiryPurpose: '01',
              FirstName: 'JOHN DOE',
              InquiryAddresses: [
                {
                  seq: '2',
                  AddressType: ['O'],
                  AddressLine1: '123 Main Street',
                  State: 'CA',
                  Postal: '90210'
                }
              ],
              InquiryPhones: [
                {
                  seq: '1',
                  PhoneType: ['M'],
                  Number: '9876543210'
                }
              ],
              IDDetails: [
                {
                  seq: '1',
                  IDType: 'P',
                  IDValue: 'ABCDE1234F',
                  Source: 'Inquiry'
                },
                {
                  seq: '3',
                  IDType: 'D',
                  Source: 'Inquiry'
                },
                {
                  seq: '5',
                  IDType: 'A',
                  Source: 'Inquiry'
                }
              ],
              DOB: '1990-05-15'
            },
            Score: [
              {
                Type: 'FICO',
                Version: '5.0'
              }
            ],
            CCRResponse: {
              Status: '0',
              CIRReportDataLst: [
                {
                  InquiryResponseHeader: {
                    CustomerCode: 'CUSTOMER001',
                    CustRefField: '654321',
                    ReportOrderNO: '98765432',
                    ProductCode: ['CREDRPT'],
                    SuccessCode: '0',
                    Date: '2023-11-20',
                    Time: '12:45:30',
                    HitCode: '20',
                    CustomerName: 'ACME Corp'
                  },
                  InquiryRequestInfo: {
                    InquiryPurpose: 'Credit',
                    FirstName: 'JOHN DOE',
                    InquiryAddresses: [
                      {
                        seq: '2',
                        AddressType: ['O'],
                        AddressLine1: '123 Main Street',
                        State: 'CA',
                        Postal: '90210'
                      }
                    ],
                    InquiryPhones: [
                      {
                        seq: '1',
                        PhoneType: ['M'],
                        Number: '9876543210'
                      }
                    ],
                    IDDetails: [
                      {
                        seq: '1',
                        IDType: 'P',
                        IDValue: 'ABCDE1234F',
                        Source: 'Inquiry'
                      }
                    ],
                    DOB: '1990-05-15'
                  },
                  Score: [
                    {
                      Type: 'FICO',
                      Version: '5.0'
                    }
                  ],
                  CIRReportData: {
                    IDAndContactInfo: {
                      PersonalInfo: {
                        Name: {
                          FullName: 'JOHN DOE',
                          FirstName: 'JOHN',
                          LastName: 'DOE'
                        },
                        AliasName: {},
                        DateOfBirth: '1990-05-15',
                        Gender: 'Male',
                        Age: {
                          Age: '33'
                        },
                        PlaceOfBirthInfo: {}
                      },
                      IdentityInfo: {
                        PANId: [
                          {
                            seq: '1',
                            ReportedDate: '2015-07-31',
                            IdNumber: 'ABCDE1234F'
                          }
                        ],
                        Passport: [
                          {
                            seq: '1',
                            ReportedDate: '2015-07-31',
                            IdNumber: 'P1234567'
                          }
                        ]
                      },
                      AddressInfo: [
                        {
                          Seq: '2',
                          ReportedDate: '2015-07-31',
                          Address: '789 Pine Street',
                          State: 'CA',
                          Postal: '90210',
                          Type: 'Office'
                        },
                        {
                          Seq: '1',
                          ReportedDate: '2015-07-31',
                          Address: '123 Main Street',
                          State: 'CA',
                          Postal: '90210',
                          Type: 'Primary'
                        }
                      ],
                      PhoneInfo: [
                        {
                          seq: '2',
                          typeCode: 'H',
                          ReportedDate: '2015-07-31',
                          Number: '9879876543'
                        }
                      ],
                      EmailAddressInfo: [
                        {
                          seq: '1',
                          ReportedDate: '2015-07-31',
                          Email: 'john.doe@email.com'
                        }
                      ]
                    }
                  }
                },
                {
                  InquiryResponseHeader: {
                    CustomerCode: 'CUSTOMER002',
                    CustRefField: '789012',
                    ReportOrderNO: '34567890',
                    ProductCode: ['IDCR'],
                    SuccessCode: '1',
                    Date: '2023-11-19',
                    Time: '09:15:45',
                    HitCode: '15',
                    CustomerName: 'ABC Corporation'
                  },
                  InquiryRequestInfo: {
                    InquiryPurpose: 'Credit',
                    FirstName: 'ALICE JOHNSON',
                    InquiryAddresses: [
                      {
                        seq: '3',
                        AddressType: ['O'],
                        AddressLine1: '789 Pine Street',
                        State: 'CA',
                        Postal: '90210'
                      }
                    ],
                    InquiryPhones: [
                      {
                        seq: '2',
                        PhoneType: ['H'],
                        Number: '9879876543'
                      }
                    ],
                    IDDetails: [
                      {
                        seq: '2',
                        IDType: 'A',
                        IDValue: 'XYZAB1234C',
                        Source: 'Inquiry'
                      }
                    ],
                    DOB: '1987-12-15'
                  },
                  Score: [
                    {
                      Type: 'FICO',
                      Version: '8.0'
                    }
                  ],
                  CIRReportData: {
                    IDAndContactInfo: {
                      PersonalInfo: {
                        Name: {
                          FullName: 'ALICE JOHNSON',
                          FirstName: 'ALICE',
                          LastName: 'JOHNSON'
                        },
                        AliasName: {},
                        DateOfBirth: '1987-12-15',
                        Gender: 'Female',
                        Age: {
                          Age: '35'
                        },
                        PlaceOfBirthInfo: {}
                      },
                      IdentityInfo: {
                        PANId: [
                          {
                            seq: '2',
                            ReportedDate: '2016-02-28',
                            IdNumber: 'XYZAB1234C'
                          }
                        ],
                        Passport: [
                          {
                            seq: '2',
                            ReportedDate: '2016-02-28',
                            IdNumber: 'P9876543'
                          }
                        ]
                      },
                      AddressInfo: [
                        {
                          Seq: '2',
                          ReportedDate: '2016-02-28',
                          Address: '789 Pine Street',
                          State: 'CA',
                          Postal: '90210',
                          Type: 'Office'
                        }
                      ],
                      PhoneInfo: [
                        {
                          seq: '2',
                          typeCode: 'H',
                          ReportedDate: '2016-02-28',
                          Number: '9879876543'
                        }
                      ]
                    }
                  }
                }
              ],
              status_code: 200,
              success: true,
              message: 'Success',
              message_code: 'success'
            }
          },
          credit_report_link: ''
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'credit_report_v2_PTNzvmpKROxbBrRDdrjz',
          id_number: '********5514',
          id_type: 'aadhaar',
          mobile: '8079012345',
          name: 'Vishal Rathore',
          credit_score: '',
          credit_report: {},
          credit_report_link: ''
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  credit_report_pdf: {
    success: {
      data: {
        data: {
          client_id: 'credit_report_v2_pdf_ywWaXdhazoIEjbpPuvqc',
          id_number: '********5514',
          id_type: 'aadhaar',
          mobile: '8079012345',
          name: 'Vishal Rathore',
          credit_score: '799',
          credit_report: {},
          credit_report_link:
            'https://aadhaar-kyc-docs.s3.amazonaws.com/vishal.rathore/credit_report_v2/credit_reporure=568a2c563ec24f24fe3a6a03ce3180a888b27091d1e55d8a7562fd06247f3693'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'credit_report_v2_pdf_YygamLlwrYijpaauUbsl',
          id_number: '********5514',
          id_type: 'aadhaar',
          mobile: '8079012345',
          name: 'Vishal Rathore',
          credit_score: '',
          credit_report: {},
          credit_report_link: ''
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  director_phone: {
    success: {
      data: {
        data: {
          client_id: 'director_phone_oxjmjVHbVouynMCmjptC',
          din_number: '00000000',
          phone_number: '+91900000000000'
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'director_phone_VCnqlwaZLcNhydxgsWio',
          din_number: '00000000',
          phone_number: null
        },
        status_code: 422,
        success: false,
        message: 'invalid_or_inactive',
        message_code: null
      }
    }
  },
  ecourt_cnr: {
    success: {
      data: {
        data: {
          client_id: 'ecourt_cnr_search_hRguiuMgammwvWcqpuom',
          cnr_number: 'CHCH0100123456789',
          cnr_details: {
            case_details: {
              case_type: 'CRA',
              filing_number: '192/2000',
              filing_date: '2000-00-06',
              registration_number: '3000/2000',
              registration_date: '2000-00-07'
            },
            case_status: {
              first_hearing_date: '2000-00-07',
              next_hearing_date: '2000-11-02',
              case_stage: 'Defence evidence ',
              court_number_and_judge: 'District Judge',
              decision_date: null,
              nature_of_disposal: ''
            },
            petitioner_and_advocate_details: {
              petitioner: 'K AGGARWAL',
              advocate: 'V Jain'
            },
            respondent_and_advocate_details: [
              'INCOME  OFFICER',
              'UNION TERRITORY',
              'CORPORATION ITD',
              'N AGGARWAL',
              'P AGGARWAL',
              'P SINGH'
            ],
            act_details: [
              {
                under_act: 'Cr. P.C.',
                under_section: '374'
              }
            ],
            subordinate_court_information_details: {
              case_number_and_year: '0001000 -  2019',
              case_decision_date: '2000-00-08'
            },
            case_history_details: [
              {
                judge: 'District Judge',
                business_on_date: '2000-00-07',
                hearing_date: '2000-00-02',
                purpose_of_hearing: 'Defence evidence'
              }
            ],
            interim_orders_details: [
              {
                order_number: '1',
                order_date: '2000-00-07'
              }
            ],
            final_orders_and_judgements_details: [],
            case_transfer_and_establishment_details: [],
            process_details: [
              {
                process_id: 'PCHCH01000987654000_1_1',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_1_2',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_1_3',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_1_4',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_1_5',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_1_6',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_2_1',
                process_data: '2000-07-00',
                process_title: 'Docket Calling.'
              }
            ]
          }
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'ecourt_cnr_search_HxMPvyByitraxVlkkjoD',
          cnr_number: 'APAS020001080000',
          cnr_details: {}
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  electricity_bill: {
    success: {
      data: {
        data: {
          client_id: 'electricity_jBxiqjAGXuymlqlbrOOb',
          customer_id: '17000346322745',
          operator_code: 'MH',
          state: 'maharashtra',
          full_name: 'SUKHWANI',
          address: 'COLONY SOLAPUR ROAD NR LAD GIRNI SHEWALWADI 412307',
          mobile: null,
          user_email: null,
          bill_amount: '1,280.00',
          bill_number: null,
          document_link: null
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: null,
          customer_id: '17000346322745',
          operator_code: 'MH',
          state: 'maharashtra',
          full_name: null,
          address: null,
          mobile: null,
          user_email: null,
          bill_amount: null,
          bill_number: null,
          document_link: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  employment_history_uan: {
    success: {
      data: {
        data: {
          client_id: 'employment_history_uan_aueTsCLbIqUDULtEFwZU',
          uan: '111779821234',
          employment_history: [
            {
              name: 'Munna Bhbaiya',
              guardian_name: 'Kaleen Bhaiya',
              establishment_name: 'I PROCESS SERVICES (INDIA) PVT. LTD.',
              member_id: 'KDMAL004123654000313079',
              date_of_joining: '2021-03-15',
              date_of_exit: null,
              last_pf_submitted: '2022-06-14',
              wage_month: 'May-2022'
            }
          ]
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'employment_history_uan_owsYxXfJqptbCdfxxjxw',
          uan: '101669821230',
          employment_history: []
        },
        status_code: 422,
        success: false,
        message: 'No Employment Record Found.',
        message_code: null
      }
    }
  },
  fastag_rc: {
    success: {
      data: {
        data: {
          client_id: 'fastag_to_rc_OPartnFuEJMAwiUTWbsA',
          fastag_id: '34161FA123456EE81E41EAE0',
          rc_number: 'GJ05XX1234',
          tag_status: 'ACTIVE',
          vehicle_class: 'VC4',
          issue_date: '2022-10-20',
          issuer_bank: 'IDFC Bank'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'fastag_to_rc_CWBFxWWjVtHZZdjMmwnk',
          fastag_id: '34161FA123456EE81E41EAE0',
          rc_number: null,
          tag_status: null,
          vehicle_class: null,
          issue_date: null,
          issuer_bank: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  fastag_verification: {
    success: {
      data: {
        data: {
          client_id: 'fastag_verification_dRKBysWbCksWhLlUpdrx',
          rc_number: 'GJ05CN0000',
          bank_name: 'IDFC First Bank',
          tag_id: '0000FA00008EE81FCA123',
          status: 'Active'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'fastag_verification_YcAxegLbwcnndbpXnCow',
          rc_number: 'GJ05CN0000',
          bank_name: null,
          tag_id: null,
          status: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  find_upi_id: {
    success: {
      data: {
        data: {
          client_id: 'find_upi_btYgGDVllvsuKxccKofh',
          mobile_number: '1234567890',
          upi_id: 'xyz123@ybl'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'find_upi_aRwaCnnibJvbBespVmVz',
          mobile_number: '1234567890',
          upi_id: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  mobile_number_rc: {
    success: {
      data: {
        data: {
          client_id: 'mobile_number_to_rc_ubFojfkItBiHxioFbzJz',
          rc_number: ['RJ14XJ1234'],
          mobile_number: '8908885858'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'mobile_number_to_rc_oeVUKwQlHnUjgVGlNjtl',
          rc_number: [],
          mobile_number: '8908885858'
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  mobile_to_bank: {
    success: {
      data: {
        data: {
          client_id: 'mobile_to_bank_details_NkSxYeGblpzYhwMBbirH',
          bank_ifsc: 'UTIB0001234',
          bank_account_no: '92001006123456789',
          bank_details: 'AXIS BANK, JAIPUR',
          name: 'VISHAL RATHORE'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'mobile_to_bank_details_votfuQkijjwnuYepgebj',
          bank_ifsc: null,
          bank_account_no: null,
          bank_details: null,
          name: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  pan_to_uan: {
    success: {
      data: {
        data: {
          client_id: 'pan_to_uan_hoadKOGjFSjwnS',
          pan_number: 'XXXXX1234X',
          uan_number: '123456789'
        },
        message_code: 'success',
        success: true,
        message: null,
        status: 200
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'pan_to_uan_rkmoXxozWLIhomgKBpqu',
          pan_number: 'XXXX1234XXXX',
          uan_number: ''
        },
        status_code: 422,
        success: false,
        message: 'Invalid PAN Number provided',
        message_code: 'invalid_pan'
      }
    }
  },
  passport: {
    success: {
      data: {
        data: {
          date_of_application: '2017-07-24',
          file_number: 'DL1061291XXXXXX',
          client_id: 'passport_rfqevMkcqenNPushfhfM',
          full_name: 'MUNNA BHAIYA',
          passport_number: 'S2420000',
          dob: '1990-01-01'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          date_of_application: null,
          file_number: 'DL1061291XXXXXX',
          client_id: null,
          full_name: null,
          passport_number: null,
          dob: '1990-01-01'
        },
        status_code: 422,
        success: false
      }
    }
  },
  rc_number_mobile: {
    success: {
      data: {
        data: {
          client_id: 'rc_to_mobile_number_WmrcRThlcmadfhblXtvQ',
          rc_number: 'RJ14XJ1234',
          mobile_number: '8890856565'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'rc_to_mobile_number_QjCgmrETvYbHqPLvcZjv',
          rc_number: 'RJ14XJ1234',
          mobile_number: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  ration_card: {
    success: {
      data: {
        data: {
          client_id: 'ration_card_LqcwSxyPrnrKsnJjRwaD',
          id_number: '10140100006004000005',
          state_portal: 'central',
          state_name: 'BIHAR',
          district_name: 'MUZAFFARPUR',
          fps_id: '121600100663',
          scheme_name: 'PHH',
          dup_uid_status: 'No',
          member_details_list: [
            {
              member_id: '1014010000600400000501',
              member_name: 'JAVANTI DEVI',
              uid_status: true,
              masked_aadhaar: null,
              relationship_name: 'SELF'
            },
            {
              member_id: '1014010000600400000502',
              member_name: 'RAMLAKSHAN RAI',
              uid_status: true,
              masked_aadhaar: null,
              relationship_name: 'NOT AVAILABLE'
            },
            {
              member_id: '1014010000600400000504',
              member_name: 'SAJAN KUMAR',
              uid_status: true,
              masked_aadhaar: null,
              relationship_name: 'SON'
            },
            {
              member_id: '1014010000600400000505',
              member_name: 'VIRSAN KUMAR',
              uid_status: true,
              masked_aadhaar: null,
              relationship_name: 'SON'
            }
          ]
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'ration_card_uxzWHzSaOtxwqqvNbDlJ',
          id_number: '10140100006004000000',
          state_portal: 'central',
          state_name: null,
          district_name: null,
          fps_id: null,
          scheme_name: null,
          dup_uid_status: null,
          member_details_list: []
        },
        status_code: 422,
        success: false,
        message: 'Invalid Ration Card Number',
        message_code: 'verification_error'
      }
    }
  },
  tan: {
    success: {
      data: {
        data: {
          client_id: 'tan_kjYdJwRvRJQszuvgdruK',
          tan: 'RTKT06731E',
          name: 'TAXREX SOLUTIONS PRIVATE LIMITED'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'tan_aVnCmDGrVzzickktvtyO',
          tan: 'RTKT06731Z',
          name: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: null
      }
    }
  }
}

module.exports = MOCK_RESPONSES
