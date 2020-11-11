package com.order.service;

import com.order.entities.Voucher;
import com.order.repository.VoucherRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class VoucherService extends CommonRepository<Voucher,VoucherRepository> {
    
    
    public VoucherService(VoucherRepository repo) {
        super(repo);
    }
    
    public Optional<Voucher> findByCode(String code){
        return repo.findByCode(code);
    }
}
